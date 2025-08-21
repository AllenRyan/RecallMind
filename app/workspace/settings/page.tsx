import { Construction } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="p-8 text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          <Construction className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          We're working hard to bring you an amazing settings experience. Check back later!
        </p>
      </div>
    </div>
  )
}
