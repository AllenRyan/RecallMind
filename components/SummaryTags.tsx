import { Badge } from "@/components/ui/badge"

const SummaryTags = ({tags}: any) => {
    return ( 
        <div className="flex flex-wrap gap-1">
            {tags.map((tag: string) => (
                <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors"
                >
                    {tag}
                </Badge>
            ))}
        </div>
    );
}
 
export default SummaryTags;