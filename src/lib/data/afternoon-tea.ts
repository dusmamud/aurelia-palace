export const TEA_PRICE = 2200;
export const TEA_TIMINGS = '3:30 PM – 5:30 PM daily';
export const TEA_VENUE = 'The Courtyard';

export type MenuItem = {
	name: string;
	text: string;
};

export type MenuSection = {
	slug: string;
	title: string;
	text: string;
	items: MenuItem[];
};

export const MENU: MenuSection[] = [
	{
		slug: 'savouries',
		title: 'Savouries',
		text: 'Small, warm and made to order — the savoury tier arrives first.',
		items: [
			{ name: 'Cucumber & mint sandwiches', text: 'White bread, whipped butter, garden mint.' },
			{ name: 'Smoked salmon on rye', text: 'House-cured salmon, dill cream cheese.' },
			{ name: 'Paneer tikka sliders', text: 'Charred paneer, mint chutney, soft brioche.' },
			{ name: 'Mini samosa chaat', text: 'Crisp samosa, yoghurt, tamarind, sev.' }
		]
	},
	{
		slug: 'scones',
		title: 'Scones',
		text: 'Baked in the palace kitchen every afternoon, served warm.',
		items: [
			{ name: 'Classic plain scones', text: 'With clotted cream and strawberry preserve.' },
			{ name: 'Saffron & pistachio scones', text: 'A Jaipur twist on the classic — saffron in the dough.' },
			{ name: 'Fruit scones', text: 'Raisins and orange zest, served with lemon curd.' }
		]
	},
	{
		slug: 'desserts',
		title: 'Desserts',
		text: 'The sweet tier — small enough to finish, rich enough to remember.',
		items: [
			{ name: 'Saffron kulfi', text: 'Slow-set kulfi with pistachio dust.' },
			{ name: 'Rose petal macarons', text: 'Rose ganache, candied petals.' },
			{ name: 'Mango cheesecake', text: 'Alphonso mango, baked cheesecake, crumb base.' },
			{ name: 'Chocolate & cardamom tart', text: 'Dark chocolate, green cardamom, sea salt.' }
		]
	},
	{
		slug: 'teas',
		title: 'Teas',
		text: 'Choose one pot per guest, from our list of eighteen — or ask for the tasting flight.',
		items: [
			{ name: 'Assam gold tips', text: 'Malty and full — the classic Indian breakfast tea.' },
			{ name: 'Darjeeling first flush', text: 'Light, floral, from the spring harvest.' },
			{ name: 'Masala chai', text: 'The palace recipe — ginger, cardamom, clove.' },
			{ name: 'Jasmine green', text: 'Delicate green tea, scented with jasmine flowers.' }
		]
	}
];
