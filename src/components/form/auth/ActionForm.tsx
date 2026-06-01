import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";

interface ActionFormProps {
	canSubmit: boolean;
	isSubmitting: boolean;
	isPending: boolean;
	title: string;
}

export function ActionForm({
	canSubmit,
	isSubmitting,
	isPending,
	title,
}: ActionFormProps) {
	return (
		<Button
			disabled={!canSubmit || isSubmitting || isPending}
			className="w-full"
		>
			{isSubmitting || isPending ? (
				<>
					<Spinner />
					<span>Đan xử lý...</span>
				</>
			) : (
				<span>{title}</span>
			)}
		</Button>
	);
}
