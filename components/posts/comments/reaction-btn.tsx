import { Button } from "@/components/ui/button";

interface ReactionButtonParams {
  viewCount?: boolean;
  count: number;
  onClick: () => void;
  icon: JSX.Element;
}

const ReactionButton = ({ viewCount = false, count, onClick, icon }: ReactionButtonParams) => (
  <div className="flex items-center">
    <Button variant="ghost" className="py-0 px-2 rounded-full" onClick={onClick}>
      {icon}
    </Button>
    {viewCount && !!count && <span className="pt-1 text-sm text-gray-600 dark:text-gray-300">{count}</span>}
  </div>
);

export default ReactionButton;
