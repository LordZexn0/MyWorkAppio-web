export default function Footer() {
  return (
    <footer className="w-full py-6 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <img src="images/logo.png" alt="MyWorkApp.io Logo" className="h-8 w-auto mr-2" />
          <span className="text-[#FF6B35] text-sm">MyWorkApp.io</span>
        </div>
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} MyWorkApp.io. All rights reserved.</p>
      </div>
    </footer>
  )
}
