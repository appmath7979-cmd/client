import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { TutorialCollapse } from "./TutorialCollapse";

const collapsibleList = [
	{
		name: "Thành phố/Tỉnh thành",
		contents: [
			"Tiền Giang: tg",
			"Kiên Giang: kg",
			"Khánh Hòa: kh",
			"Kon Tum: kt",
			"TP.HCM: tp",
			"Đồng Tháp: dt",
			"Cà Mau: cm",
			"Thừa Thiên Huế: th",
			"Phú Yên: py",
			"Vũng Tàu: vt",
			"Bạc Liêu: bli",
			"Đà Lạt: dl",
			"Cần Thơ: ct",
			"Sóc Trăng: st",
			"Đà Nẵng/Đồng Nai: dn",
			"Tây Ninh: tn",
			"An Giang: ag",
			"Bình Thuận: bt",
			"Quảng Bình: qb",
			"Quảng Trị: qt",
			"Vĩnh Long: vl",
			"Bình Dương: bd",
			"Trà Vinh: tv",
			"Gia Lai: gl",
			"Ninh Thuận: nt",
			"Long An: la",
			"Hậu Giang: hg",
			"Bình Phước: bp",
			"Quãng Ngãi: qn",
			"Đăk Nông: dno",
		],
	},
	{
		name: "Lệnh 2 càng",
		contents: [
			"bao: b hoặc lo",
			"đá thẳng: da",
			"đá xiên: dax",
			"đầu đuôi: dd",
		],
	},
	{
		name: "Lệnh 3 càng",
		contents: [
			"bao: b hoặc lo",
			"bao đảo: bd hoặc baodao",
			"xỉu chủ: xc",
			"xỉu đầu: xdau",
			"xỉu đuôi: xduoi hoặc xdui",
		],
	},
	{
		name: "Lệnh 4 càng",
		contents: ["bao: b hoặc lo"],
	},
];

export function TutorialDialog() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Hướng dẫn</DialogTitle>
				<DialogDescription>Hướng dẫn nhập tin nhắn</DialogDescription>
			</DialogHeader>

			<div className="flex flex-col justify-center items-center w-full space-y-2">
				{collapsibleList.map((collap) => (
					<TutorialCollapse
						key={collap.name}
						name={collap.name}
						items={collap.contents}
					/>
				))}
			</div>
		</DialogContent>
	);
}
