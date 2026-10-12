import { Button } from '@mui/material';
import './page.scss';
import homePageData from "@/data/homePageData.json";
import { ArrowRight } from '@mui/icons-material';
import { getLocale, getTranslations } from 'next-intl/server';
import { localizedPath, isLocale } from '@/lib/seo';

export default async function Home() {
	const t = await getTranslations("homePage")
	const tImg = await getTranslations("images")
	const rawLocale = await getLocale()
	const locale = isLocale(rawLocale) ? rawLocale : 'en'
	const serviceKeys = ['familyReunion', 'visaApplications', 'residencePermits', 'businessVisas'] as const
	return (
		<>
			<div className="homeContent">


				<div className='page page_firstPage'>
					<div className="imgContainer">
						<img src={homePageData.firstPageSrc} alt={tImg('eiffelTowerAlt')} />
					</div>
					<div className='messageOverlayContainer'>
						{
							homePageData.firstPageWordsImgs.map((item, index) => {
								return (
									<div key={index} className={"imgContainer " + item.classname}>
										<img src={item.src} alt="" />
									</div>
								)
							})
						}
					</div>
					<h1 className='sr-only'>{t('firstPage.heroTitle')}</h1>
				</div>


				<div className='page page_secondPage'>
					<div className='flex--row'>
						<div className='homePage_aboutMe flex--row'>
							<div className='card'>
								<h2 className='title'>{t('secondPage.aboutMeCardTitle')}</h2>
								<div className='cardContent'>
									{t('secondPage.aboutMeCardParagraph')}
								</div>
								<Button sx={{ color: 'black', backgroundColor: 'gold' }} href={localizedPath(locale, '/aboutMe')}>
									{t('secondPage.moreAboutMeButtonText') ? t('secondPage.moreAboutMeButtonText') : ''}
									<ArrowRight />
								</Button>
							</div>
						</div>
						<div className='imgContainer portraitImg sideImgContainer'>
							<img src={homePageData.secondPage.imgSrc} alt={tImg('portraitAlt')} />
						</div>
					</div>
				</div>


				<div className='page page_thirdPage'>
					<div className='card flex--row'>
						<div className='cardContentContainer'>
							<div className='expertise'>
								<h2 className='title'>{t('thirdPage.expertiseCardTitle')}</h2>
								<div className='cardContent'>
									{t('thirdPage.expertiseCardParagraph')}
								</div>
							</div>
							<div className='expertise_icons'>
								{
									homePageData.thirdPage.expertisesIcons.map((item, index) => {
										return (
											<div key={index} className='imgContainer glassBg sideImgContainer'>
												<img src={item.src} alt={t('thirdPage.services.' + serviceKeys[index])} />
											</div>
										)
									})
								}
							</div>
						</div>
						<Button sx={{ color: 'black', backgroundColor: 'gold' }} href={localizedPath(locale, '/areaOfExpertise')}>
							{t('thirdPage.moreExpertiseButtonText') ? t('thirdPage.moreExpertiseButtonText') : ''}
							<ArrowRight />
						</Button>
					</div>
				</div>

				<div className='page page_fourthPage'>
					<div className='flex--row itemsContainer'>
						<div className='imgContainer sideImgContainer'>
							<img src={homePageData.fourthPage.sideImgSrc} alt={tImg('ladyJusticeAlt')} />
						</div>
						<div className='homePage_publications flex--row'>
							<div className='card'>
								<h2 className='title'>{t('fourthPage.publicationsCardTitle')}</h2>
								{/* <div className='cardContent'>
									{t('fourthPage.publicationsCardParagraph')}
								</div> */}
								<Button sx={{ color: 'black', backgroundColor: 'gold' }} href={localizedPath(locale, '/publications')}>
									{t('fourthPage.morePublicationsButtonText') ? t('fourthPage.morePublicationsButtonText') : ''}
									<ArrowRight />
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className='page page_fifthPage'>
					<div className='homePage_honorary flex--row'>
						<div className='card'>
							<h2 className='title'>{t('fifthPage.honoraryTitle')}</h2>
							<div className='cardContent'>
								{t.rich('fifthPage.honoraryContent', {
									p: (chunks) => <p>{chunks}</p>
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
