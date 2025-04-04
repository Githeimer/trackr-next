export const metadata = {
    title: "Trackrr",
    description: "Track your habit and analyze them later",
    keywords: "habit, github contribution, to-do-list, task",
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
     <div className="container">
      {children}
      </div>
    );
  }
  