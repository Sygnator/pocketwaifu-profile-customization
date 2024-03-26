// place files you want to import through the `$lib` alias in this folder.
export type LevelBorderType =
	| false
	| 2
	| 5
	| 10
	| 15
	| 20
	| 25
	| 35
	| 40
	| 45
	| 50
	| 55
	| 60
	| 65
	| 70
	| 75
	| 80
	| 85
	| 90
	| 95
	| 100
	| 125
	| 150
	| 175
	| 200;

export enum ProfileTypeEnum {
	Cards,
	MiniGallery,
	ShowCards,
	Stats
}

export enum KarmaState {
	Demon = 'kd',
	Neutral = 'kn',
	Angel = 'kl'
}

export enum CardRarity {
	SSS = 'SSS',
	SS = 'SS',
	S = 'S',
	A = 'A',
	B = 'B',
	C = 'C',
	D = 'D',
	E = 'E'
}

export enum AvatarBorder {
	None = 'None',
	Base = 'Base',
	PurpleLeaves = 'PurpleLeaves',
	Dzedai = 'Dzedai',
	Water = 'Water',
	Crows = 'Crows',
	Bow = 'Bow',
	Metal = 'Metal',
	RedThinLeaves = 'RedThinLeaves',
	Skull = 'Skull',
	Fire = 'Fire',
	Ice = 'Ice',
	Promium = 'Promium',
	Gold = 'Gold',
	Red = 'Red',
	Rainbow = 'Rainbow',
	Pink = 'Pink',
	Simple = 'Simple'
}
