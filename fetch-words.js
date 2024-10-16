import process from 'node:process';
import fs from 'node:fs';
import got from 'got';
import badWords_ from 'badwords-list';
import leoProfanity from 'leo-profanity';

const {array: badWords} = badWords_;

const isVerbose = process.argv.includes('--verbose');

leoProfanity.loadDictionary('en');

const badWordsSet = new Set(badWords);

const ourBadWordsSet = new Set([
	'antierotic',
	'antiporn',
	'antipornographic',
	'antipornography',
	'antiprostitution',
	'anuses',
	'arsed',
	'arseholed',
	'arseholes',
	'arses',
	'arsey',
	'autoeroticism',
	'autoeroticisms',
	'autoerotism',
	'autoerotisms',
	'bastards',
	'bewhore',
	'bewhored',
	'bewhores',
	'bitched',
	'bitchen',
	'bitcheries',
	'bitchery',
	'bitchfest',
	'bitchfests',
	'bitchier',
	'bitchiest',
	'bitchily',
	'bitchiness',
	'bitchinesses',
	'bitchy',
	'bollocked',
	'bollocking',
	'bollockings',
	'bollocksed',
	'bollockses',
	'bollocksing',
	'bollox',
	'bolloxed',
	'bolloxes',
	'bolloxing',
	'boners',
	'booshit',
	'buggered',
	'buggeries',
	'buggering',
	'buggers',
	'buggery',
	'bukkakes',
	'bulldykes',
	'bullshits',
	'bullshitted',
	'bullshitter',
	'bullshitters',
	'bullshitting',
	'bullshittings',
	'bumfuck',
	'bumfucks',
	'chickenshit',
	'chickenshits',
	'cleverdick',
	'cleverdicks',
	'clitoral',
	'clitorectomies',
	'clitorectomy',
	'clitoric',
	'clitoridectomies',
	'clitoridectomy',
	'clitorides',
	'clitorises',
	'cocksuckers',
	'coprophiliac',
	'coprophiliacs',
	'coprophilias',
	'coprophilic',
	'coprophilous',
	'cunnilinguses',
	'cunted',
	'cunting',
	'cuntish',
	'cunty',
	'cyberporn',
	'cyberporns',
	'cybersex',
	'cybersexes',
	'dicked',
	'dickheads',
	'dicking',
	'dicks',
	'dickty',
	'dildoe',
	'dildoes',
	'dipshit',
	'dipshits',
	'dominatrixes',
	'dumbshit',
	'dumbshits',
	'dyked',
	'dykes',
	'dykey',
	'ejaculations',
	'ejaculative',
	'ejaculator',
	'erotica',
	'erotical',
	'erotically',
	'eroticisation',
	'eroticisations',
	'eroticise',
	'eroticised',
	'eroticises',
	'eroticising',
	'eroticism',
	'eroticisms',
	'eroticist',
	'eroticists',
	'eroticization',
	'eroticizations',
	'eroticize',
	'eroticized',
	'eroticizes',
	'eroticizing',
	'erotics',
	'erotised',
	'erotises',
	'erotising',
	'erotisms',
	'erotization',
	'erotizations',
	'faggoted',
	'faggoting',
	'faggotings',
	'faggotries',
	'faggotry',
	'faggots',
	'faggoty',
	'feces',
	'fellated',
	'fellates',
	'fellating',
	'fellation',
	'fellations',
	'fellatios',
	'feminazi',
	'feminazis',
	'fuckoff',
	'fuckoffs',
	'fuckup',
	'fuckups',
	'fuckwits',
	'gangbanger',
	'gangbangers',
	'gangbanging',
	'gangshag',
	'gangshagged',
	'gangshagging',
	'gangshags',
	'gobshite',
	'gobshites',
	'goddam',
	'goddammed',
	'goddamming',
	'goddamndest',
	'goddamning',
	'goddamns',
	'handjobs',
	'hardcores',
	'headfuck',
	'headfucks',
	'homoeroticism',
	'homoeroticisms',
	'homoerotism',
	'hookers',
	'hornier',
	'hornily',
	'horniness',
	'horninesses',
	'horseshit',
	'horseshits',
	'incests',
	'incestuous',
	'incestuously',
	'incestuousness',
	'incestuousnesses',
	'intercourses',
	'jailbaits',
	'jigaboos',
	'jisms',
	'jissom',
	'jissoms',
	'jizzes',
	'kikes',
	'lovemaker',
	'lovemakers',
	'lovemakings',
	'masochism',
	'masochisms',
	'masochistic',
	'masochistically',
	'masochists',
	'masturbated',
	'masturbates',
	'masturbating',
	'milfs',
	'mindfuck',
	'mindfucks',
	'mofos',
	'multiorgasmic',
	'nazification',
	'nazifications',
	'nazified',
	'nazifies',
	'nazify',
	'nazifying',
	'negroes',
	'negrohead',
	'negroheads',
	'negroid',
	'negroidal',
	'negroids',
	'negrophil',
	'negrophile',
	'negrophiles',
	'negrophilism',
	'negrophilisms',
	'negrophilist',
	'negrophilists',
	'negrophils',
	'negrophobe',
	'negrophobes',
	'negrophobia',
	'negrophobias',
	'niggard',
	'niggarded',
	'niggarding',
	'niggardise',
	'niggardises',
	'niggardize',
	'niggardizes',
	'niggardliness',
	'niggardlinesses',
	'niggardly',
	'niggards',
	'niggerdom',
	'niggerdoms',
	'niggered',
	'niggerhead',
	'niggerheads',
	'niggering',
	'niggerish',
	'niggerism',
	'niggerisms',
	'niggerling',
	'niggerlings',
	'niggery',
	'nippled',
	'nonerotic',
	'nonorgasmic',
	'nudeness',
	'nudenesses',
	'nudes',
	'nudie',
	'nudies',
	'nudism',
	'nudisms',
	'nudist',
	'nudists',
	'nudities',
	'orgasmed',
	'orgasmic',
	'orgasmically',
	'orgasming',
	'orgastic',
	'orgastically',
	'outbitch',
	'outbitched',
	'outbitches',
	'outbitching',
	'paedophiles',
	'paedophilia',
	'paedophiliac',
	'paedophiliacs',
	'paedophilias',
	'paedophilic',
	'paedophilics',
	'peckers',
	'pedophiles',
	'pedophilia',
	'pedophiliac',
	'pedophiliacs',
	'pedophilias',
	'pedophilic',
	'peggings',
	'penises',
	'pisshead',
	'pissheads',
	'pissoir',
	'pissoirs',
	'pissy',
	'playboys',
	'poo',
	'pood',
	'pooed',
	'poofier',
	'poofiest',
	'poofs',
	'pooftah',
	'pooftahs',
	'poofter',
	'poofters',
	'poofy',
	'pooped',
	'pooper',
	'poopers',
	'pornier',
	'porniest',
	'pornification',
	'pornifications',
	'pornocracies',
	'pornocracy',
	'pornographer',
	'pornographers',
	'pornographic',
	'pornographically',
	'pornographies',
	'pornotopia',
	'pornotopian',
	'pornotopias',
	'porns',
	'porny',
	'postorgasmic',
	'prostitute',
	'prostituted',
	'prostitutes',
	'prostituting',
	'prostitution',
	'prostitutions',
	'prostitutor',
	'prostitutors',
	'quims',
	'ragheads',
	'raped',
	'raper',
	'rapers',
	'rapes',
	'rapists',
	'rectums',
	'retardant',
	'retardants',
	'retardate',
	'retardates',
	'retardation',
	'retardations',
	'retardative',
	'retardatory',
	'retarded',
	'retarder',
	'retarders',
	'retarding',
	'retardment',
	'retardments',
	'retards',
	'rimmings',
	'sadisms',
	'sadistic',
	'sadistically',
	'sadists',
	'schlongs',
	'scrotums',
	'semens',
	'seminude',
	'seminudities',
	'seminudity',
	'semipornographic',
	'semipornographies',
	'semipornography',
	'shaggable',
	'shagged',
	'shaggedness',
	'shaggednesses',
	'shemales',
	'shites',
	'shitface',
	'shitfaced',
	'shitfaces',
	'shitheads',
	'shithole',
	'shitholes',
	'shithouse',
	'shithouses',
	'shitless',
	'shitlist',
	'shitlists',
	'shitload',
	'shitloads',
	'shittier',
	'shittiest',
	'shittily',
	'shittiness',
	'shittinesses',
	'shortarse',
	'shortarses',
	'slutteries',
	'sluttery',
	'sluttier',
	'sluttiest',
	'sluttily',
	'sluttiness',
	'sluttinesses',
	'sluttish',
	'sluttishly',
	'sluttishness',
	'sluttishnesses',
	'slutty',
	'smartarse',
	'smartarsed',
	'smartarses',
	'smartass',
	'sodomized',
	'sodomizes',
	'sodomizing',
	'sonofabitch',
	'spastic',
	'spastically',
	'spasticities',
	'spasticity',
	'spastics',
	'spaz',
	'spaza',
	'spazz',
	'spazzed',
	'spazzes',
	'spazzing',
	'starfucker',
	'starfuckers',
	'starfucking',
	'starfuckings',
	'strappadoed',
	'strappadoes',
	'strappadoing',
	'sucked',
	'sucky',
	'superbitch',
	'superbitches',
	'superorgasm',
	'superorgasms',
	'swastikas',
	'swingers',
	'testicles',
	'testicular',
	'testiculate',
	'threesomes',
	'tightass',
	'tittie',
	'toplessness',
	'toplessnesses',
	'towelheads',
	'tribadisms',
	'twats',
	'undress',
	'undressed',
	'undresses',
	'undressings',
	'unerotic',
	'unretarded',
	'vaginae',
	'vaginal',
	'vaginally',
	'vibrators',
	'voyeurism',
	'voyeurisms',
	'vulvae',
	'wanked',
	'wankers',
	'wankier',
	'wankiest',
	'wanking',
	'wankle',
	'wanks',
	'wanksta',
	'wankstas',
	'wetbacks',
	'whored',
	'whoredom',
	'whoredoms',
	'whorehouse',
	'whorehouses',
	'whoremaster',
	'whoremasteries',
	'whoremasterly',
	'whoremasters',
	'whoremastery',
	'whoremistress',
	'whoremistresses',
	'whoremonger',
	'whoremongeries',
	'whoremongers',
	'whoremongery',
	'whores',
	'whoreson',
	'whoresons',
	'wiseass',
	'zoophile',
	'zoophiles',
	'zoophilias',
	'zoophilic',
	'zoophilies',
]);

const url = 'https://raw.githubusercontent.com/atebits/Words/master/Words/en.txt';

const filters = [
	{
		name: 'leo-profanity',
		getReason: word => leoProfanity.check(word) ? 'is marked bad by leo-profanity' : undefined,
	},
	{
		name: 'badwords-list exact',
		getReason: word => badWordsSet.has(word) ? 'is in badwords-list' : undefined,
	},
	{
		name: 'our bad words list',
		getReason: word => ourBadWordsSet.has(word) ? 'is in our bad words list' : undefined,
	},
];

const {body} = await got(url);
let words = body.trim().split('\n');

const originalLength = words.length;

for (const filter of filters) {
	const previousLength = words.length;

	words = words.filter(word => {
		const reason = filter.getReason(word);

		if (reason !== undefined && isVerbose) {
			console.log(`word \`${word}\` excluded because it ${reason}`);
		}

		return reason === undefined;
	});

	console.log(`filtered ${previousLength - words.length} bad words with filter '${filter.name}'`);
}

console.log(`filtered ${originalLength - words.length} bad words total out of ${originalLength} original words`);

fs.writeFileSync('words.txt', words.join('\n'));
