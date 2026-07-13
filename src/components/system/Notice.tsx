import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

interface NoticeProps {
	title: string;
	description: string;
	cancelContent: string;
	submitContent: string;
	onSetIsShow: (val: boolean) => void;
}

export function Notice({
	title,
	description,
	cancelContent,
	submitContent,
	onSetIsShow,
}: NoticeProps) {
	return (
		<div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
			<div className="w-full max-w-md bg-background border shadow-lg p-10 rounded-xl flex flex-col items-center justify-center gap-6">
				<div className="text-center space-y-1">
					<p className="text-lg uppercase font-bold tracking-wider animate-pulse text-primary">
						{title}
					</p>
					<p className="text-sm font-medium text-muted-foreground">
						{description}
					</p>
				</div>
				<div className="flex items-center justify-center gap-2">
					<Button variant={"outline"} onClick={() => onSetIsShow(false)}>
						{cancelContent}
					</Button>
					<Button render={<Link to=".." />}>{submitContent}</Button>
				</div>
			</div>
		</div>
	);
}
