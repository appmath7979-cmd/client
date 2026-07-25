import { regionMapper } from "#/constants/regions.constant";
import { rewardTypeList } from "#/constants/reward.constant";
import { cn } from "#/lib/utils";
import type { IProvinceItem } from "#/types/province.type";
import type { RegionType } from "#/types/region.type";

interface LotteryItemProps {
	provinces: IProvinceItem[];
	region: RegionType;
}

export function LotteryItem({ provinces, region }: LotteryItemProps) {
	const currentPrizes = rewardTypeList.filter((item) => {
		if (region === "MB") {
			return item.region === "MB";
		}
		return item.region === "MN_MT";
	});

	return (
		<div className="bg-accent rounded-md border shadow-xs overflow-hidden">
			{/* Tiêu đề vùng miền */}
			<h3 className="text-lg font-semibold bg-primary text-primary-foreground text-center py-3 border-b">
				Kết quả {regionMapper[region]}
			</h3>

			{/* Vùng chứa scroll ngang */}
			<div className="overflow-x-auto w-full">
				{/* Đảm bảo bảng có chiều rộng tối thiểu (ví dụ: min-w-[500px] hoặc tính toán theo số lượng tỉnh) để không bị bóp méo */}
				<div className="min-w-[450px] w-full">
					{/* Header danh sách tỉnh */}
					<div className="flex items-center w-full text-center font-semibold bg-muted/50 max-md:text-xs">
						{/* Cột Giải cố định bên trái */}
						<p className="w-[120px] shrink-0 sticky left-0 z-10 bg-muted/90 backdrop-blur-xs py-2.5 border-b border-r shadow-[1px_0_0_0_rgba(0,0,0,0.1)]">
							Giải
						</p>
						{/* Các cột tỉnh linh hoạt */}
						<div className="grid grid-flow-col auto-cols-fr flex-1">
							{provinces.map((province) => (
								<p
									key={`${regionMapper[region]}-${province.code}`}
									className="py-2.5 border-b border-r last:border-r-0 truncate px-1"
								>
									{province.name}
								</p>
							))}
						</div>
					</div>

					{/* Danh sách các giải và kết quả */}
					<div className="text-center max-md:text-xs">
						{currentPrizes.map((item, index) => (
							<div
								key={`${regionMapper[region]}-${item.code}`}
								className={cn(
									"flex items-center w-full",
									index % 2 !== 0 && "bg-muted/40",
								)}
							>
								{/* Cột tên giải cố định bên trái khi scroll */}
								<p
									className={cn(
										"w-[120px] shrink-0 sticky left-0 z-10 py-2.5 font-medium border-b border-r shadow-[1px_0_0_0_rgba(0,0,0,0.1)]",
										index % 2 !== 0 ? "bg-muted" : "bg-accent",
									)}
								>
									{item.name}
								</p>

								{/* Các ô kết quả cho từng tỉnh */}
								<div className="grid grid-flow-col auto-cols-fr flex-1">
									{provinces.map((province) => (
										<p
											key={`${item.code}-${province.code}`}
											className="py-2.5 border-b border-r last:border-r-0 px-1 text-foreground/80 tracking-wider font-mono"
										>
											{/* Dữ liệu kết quả xổ số của tỉnh */}
											---
										</p>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}