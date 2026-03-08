import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import FloatingChatbot from '@/components/FloatingChatbot';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <div className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
                    {children}
                </div>
            </div>
            <FloatingChatbot />
        </div>
    );
}
