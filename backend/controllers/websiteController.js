import axios from 'axios';
import * as cheerio from 'cheerio';

// Fetch dynamic content from the website
const getWebsiteContent = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        // Get the current website URL
        const websiteUrl = process.env.WEBSITE_URL || 'http://localhost:3000';
        
        try {
            // Try to fetch the main page
            const response = await axios.get(websiteUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                timeout: 10000
            });

            const $ = cheerio.load(response.data);
            
            // Extract all text content from the page
            let pageContent = '';
            
            // Get text from common content areas
            $('body').each((i, elem) => {
                pageContent += $(elem).text() + ' ';
            });
            
            // Clean up the content
            pageContent = pageContent
                .replace(/\s+/g, ' ')
                .replace(/\n+/g, ' ')
                .trim();

            if (pageContent) {
                res.json({
                    content: pageContent,
                    url: websiteUrl,
                    timestamp: new Date().toISOString()
                });
            } else {
                res.status(404).json({ error: 'No content found on the website' });
            }

        } catch (error) {
            console.error('Error fetching website:', error);
            res.status(500).json({ error: 'Failed to fetch website content' });
        }

    } catch (error) {
        console.error('Error in getWebsiteContent:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Scrape website for specific content
const scrapeWebsite = async (req, res) => {
    try {
        const { url, query } = req.query;
        
        if (!url || !query) {
            return res.status(400).json({ error: 'URL and query parameters are required' });
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                timeout: 15000
            });

            const $ = cheerio.load(response.data);
            
            // Extract structured content
            const structuredContent = {
                title: $('title').text() || '',
                headings: [],
                paragraphs: [],
                lists: [],
                links: [],
                metadata: {
                    description: $('meta[name="description"]').attr('content') || '',
                    keywords: $('meta[name="keywords"]').attr('content') || ''
                }
            };

            // Extract headings
            $('h1, h2, h3, h4, h5, h6').each((i, elem) => {
                const tagName = $(elem).prop('tagName').toLowerCase();
                structuredContent.headings.push({
                    level: tagName,
                    text: $(elem).text().trim()
                });
            });

            // Extract paragraphs
            $('p').each((i, elem) => {
                const text = $(elem).text().trim();
                if (text.length > 20) { // Only include meaningful paragraphs
                    structuredContent.paragraphs.push(text);
                }
            });

            // Extract lists
            $('ul, ol').each((i, elem) => {
                const listItems = [];
                $(elem).find('li').each((j, li) => {
                    const text = $(li).text().trim();
                    if (text) listItems.push(text);
                });
                if (listItems.length > 0) {
                    structuredContent.lists.push({
                        type: $(elem).prop('tagName').toLowerCase(),
                        items: listItems
                    });
                }
            });

            // Extract links with text
            $('a[href]').each((i, elem) => {
                const href = $(elem).attr('href');
                const text = $(elem).text().trim();
                if (text && href) {
                    structuredContent.links.push({
                        url: href,
                        text: text
                    });
                }
            });

            // Combine all content for analysis
            let allContent = [
                structuredContent.title,
                structuredContent.metadata.description,
                ...structuredContent.headings.map(h => h.text),
                ...structuredContent.paragraphs,
                ...structuredContent.lists.flatMap(l => l.items),
                ...structuredContent.links.map(l => l.text)
            ].join(' ');

            // Clean content
            allContent = allContent
                .replace(/\s+/g, ' ')
                .replace(/[^\w\s.,!?;:'"-]/g, ' ')
                .trim();

            res.json({
                content: allContent,
                structured: structuredContent,
                url: url,
                query: query,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Error scraping website:', error);
            res.status(500).json({ error: 'Failed to scrape website' });
        }

    } catch (error) {
        console.error('Error in scrapeWebsite:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get website navigation structure
const getWebsiteNavigation = async (req, res) => {
    try {
        const websiteUrl = process.env.WEBSITE_URL || 'http://localhost:3000';
        
        try {
            const response = await axios.get(websiteUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                timeout: 10000
            });

            const $ = cheerio.load(response.data);
            
            const navigation = {
                menu: [],
                links: [],
                sections: []
            };

            // Extract navigation menu
            $('nav a, .menu a, .navigation a').each((i, elem) => {
                const href = $(elem).attr('href');
                const text = $(elem).text().trim();
                if (text && href) {
                    navigation.menu.push({
                        text: text,
                        url: href.startsWith('http') ? href : new URL(href, websiteUrl).href
                    });
                }
            });

            // Extract all links
            $('a[href]').each((i, elem) => {
                const href = $(elem).attr('href');
                const text = $(elem).text().trim();
                if (text && href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                    navigation.links.push({
                        text: text,
                        url: href.startsWith('http') ? href : new URL(href, websiteUrl).href
                    });
                }
            });

            // Extract main sections
            $('main, .main, .content, section').each((i, elem) => {
                const $section = $(elem);
                const heading = $section.find('h1, h2, h3').first().text().trim();
                const content = $section.text().trim();
                
                if (content.length > 100) {
                    navigation.sections.push({
                        heading: heading || `Section ${i + 1}`,
                        content: content.substring(0, 500) + '...',
                        id: $section.attr('id') || `section-${i}`
                    });
                }
            });

            res.json({
                navigation: navigation,
                url: websiteUrl,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Error getting navigation:', error);
            res.status(500).json({ error: 'Failed to get website navigation' });
        }

    } catch (error) {
        console.error('Error in getWebsiteNavigation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    getWebsiteContent,
    scrapeWebsite,
    getWebsiteNavigation
};
