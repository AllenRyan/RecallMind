import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Trash2 } from "lucide-react"

const DeleteButton = ({summary, setDeletingId, fetchSummaries, setError, deletingId}: any) => {
    return ( 
            <Button
                variant="ghost"
                size="icon"
                className=" h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-100 hover:bg-destructive/20 hover:text-destructive transition-opacity"
                onClick={async (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    try {
                        setDeletingId(summary._id)
                        const response = await fetch(`/api/summarize/${summary._id}`, {
                            method: "DELETE",
                        })
                        if (!response.ok) {
                            throw new Error("Failed to delete summary")
                        }
                        await fetchSummaries()
                    } catch (err) {
                        console.error("Error deleting summary:", err)
                        setError("Failed to delete summary. Please try again.")
                    } finally {
                        setDeletingId(null)
                    }
                }}
                disabled={deletingId === summary._id}
            >
                {deletingId === summary._id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Trash2 className="h-8 w-8" />
                )}
            </Button>
     );
}
 
export default DeleteButton;