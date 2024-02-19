
export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  return (
    
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 rounded-card-radius bg-card-primary py-5 ">
            {children}
          </div>
        </div>
      
  );
}
