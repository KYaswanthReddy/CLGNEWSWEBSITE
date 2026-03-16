import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Core (always needed - not lazy)
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminRoute from '../components/AdminRoute';

// Lazy-loaded Pages (loaded only when navigated to)
const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const UniversityInfo = lazy(() => import('../pages/About/UniversityInfo'));
const ExamHome = lazy(() => import('../pages/ExamSchedule/ScheduleTemplate'));

// Sports
const Sports = lazy(() => import('../pages/Sports/Sports'));
const Cricket = lazy(() => import('../pages/Sports/Cricket'));
const Basketball = lazy(() => import('../pages/Sports/Basketball'));
const Kabaddi = lazy(() => import('../pages/Sports/Kabaddi'));
const Badminton = lazy(() => import('../pages/Sports/Badminton'));
const Throwball = lazy(() => import('../pages/Sports/Throwball'));
const KhoKho = lazy(() => import('../pages/Sports/KhoKho'));
const Running = lazy(() => import('../pages/Sports/Running'));
const Volleyball = lazy(() => import('../pages/Sports/Volleyball'));

// Placements
const Placements = lazy(() => import('../pages/Placements/Placements'));
const Internships = lazy(() => import('../pages/Placements/Internships'));
const Jobs = lazy(() => import('../pages/Placements/Jobs'));

// Exam Schedule
const E1 = lazy(() => import('../pages/ExamSchedule/E1/E1'));
const E2 = lazy(() => import('../pages/ExamSchedule/E2/E2'));
const E3 = lazy(() => import('../pages/ExamSchedule/E3/E3'));
const E4 = lazy(() => import('../pages/ExamSchedule/E4/E4'));

// Events & Achievements & Clubs
const UpcomingEvents = lazy(() => import('../pages/Events/UpcomingEvents'));
const StudentAchievements = lazy(() => import('../pages/Achievements/StudentAchievements'));
const Clubs = lazy(() => import('../pages/Clubs/Clubs'));
const PixelClub = lazy(() => import('../pages/Clubs/PixelClub'));
const CulturalClub = lazy(() => import('../pages/Clubs/CulturalClub'));
const TechnicalClub = lazy(() => import('../pages/Clubs/TechnicalClub'));
const GraphicDesignClub = lazy(() => import('../pages/Clubs/GraphicDesignClub'));
const InnovationClub = lazy(() => import('../pages/Clubs/InnovationClub'));
const CodingClub = lazy(() => import('../pages/Clubs/CodingClub'));
const SportsClub = lazy(() => import('../pages/Clubs/SportsClub'));
const ArtixClub = lazy(() => import('../pages/Clubs/ArtixClub'));
const InaugurationClub = lazy(() => import('../pages/Clubs/InaugurationClub'));

// Admin
const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'));
const AddNews = lazy(() => import('../pages/Admin/AddNews'));
const ManageEvents = lazy(() => import('../pages/Admin/ManageEvents'));
const ManageClubs = lazy(() => import('../pages/Admin/ManageClubs'));
const UploadExam = lazy(() => import('../pages/Admin/UploadExam'));
const AddSports = lazy(() => import('../pages/Admin/AddSports'));
const AddPlacement = lazy(() => import('../pages/Admin/AddPlacement'));
const AddAchievement = lazy(() => import('../pages/Admin/AddAchievement'));

// Global page-loading spinner
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {/* Public Routes */}
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="about" element={<UniversityInfo />} />

                    {/* Sports Routes */}
                    <Route path="sports">
                        <Route index element={<Sports />} />
                        <Route path="cricket" element={<Cricket />} />
                        <Route path="basketball" element={<Basketball />} />
                        <Route path="kabaddi" element={<Kabaddi />} />
                        <Route path="badminton" element={<Badminton />} />
                        <Route path="throwball" element={<Throwball />} />
                        <Route path="khokho" element={<KhoKho />} />
                        <Route path="running" element={<Running />} />
                        <Route path="volleyball" element={<Volleyball />} />
                    </Route>

                    {/* Protected Placements Routes */}
                    <Route path="placements">
                        <Route index element={<ProtectedRoute><Placements /></ProtectedRoute>} />
                        <Route path="internships" element={<ProtectedRoute><Internships /></ProtectedRoute>} />
                        <Route path="jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
                    </Route>

                    {/* Exam Schedule Routes — Login Required */}
                    <Route path="exams">
                        <Route index element={<ProtectedRoute><ExamHome /></ProtectedRoute>} />
                        <Route path="e1" element={<ProtectedRoute><E1 /></ProtectedRoute>} />
                        <Route path="e2" element={<ProtectedRoute><E2 /></ProtectedRoute>} />
                        <Route path="e3" element={<ProtectedRoute><E3 /></ProtectedRoute>} />
                        <Route path="e4" element={<ProtectedRoute><E4 /></ProtectedRoute>} />
                    </Route>

                    {/* Events, Achievements, Clubs */}
                    <Route path="events" element={<UpcomingEvents />} />
                    <Route path="achievements" element={<StudentAchievements />} />

                    <Route path="clubs">
                        <Route index element={<Clubs />} />
                        <Route path="pixel" element={<PixelClub />} />
                        <Route path="cultural" element={<CulturalClub />} />
                        <Route path="technical" element={<TechnicalClub />} />
                        <Route path="graphic-design" element={<GraphicDesignClub />} />
                        <Route path="innovation" element={<InnovationClub />} />
                        <Route path="coding" element={<CodingClub />} />
                        <Route path="sports" element={<SportsClub />} />
                        <Route path="artix" element={<ArtixClub />} />
                        <Route path="inauguration" element={<InaugurationClub />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="admin/add-news" element={<AdminRoute><AddNews /></AdminRoute>} />
                    <Route path="admin/manage-events" element={<AdminRoute><ManageEvents /></AdminRoute>} />
                    <Route path="admin/manage-clubs" element={<AdminRoute><ManageClubs /></AdminRoute>} />
                    <Route path="admin/upload-exam" element={<AdminRoute><UploadExam /></AdminRoute>} />
                    <Route path="admin/add-sports" element={<AdminRoute><AddSports /></AdminRoute>} />
                    <Route path="admin/add-placement" element={<AdminRoute><AddPlacement /></AdminRoute>} />
                    <Route path="admin/add-achievements" element={<AdminRoute><AddAchievement /></AdminRoute>} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;

