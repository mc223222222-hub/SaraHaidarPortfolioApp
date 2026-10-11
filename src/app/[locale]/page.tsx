import { Button } from '@mui/material';
import './page.scss';
import homePageData from "@/data/homePageData.json";
import { ArrowRight } from '@mui/icons-material';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
	const t = await getTranslations("homePage")
	return (
		<>
			<div className="homeContent">


				<div className='page page_firstPage'>
					<div className="imgContainer">
						<img src={homePageData.firstPageSrc} />
					</div>
					<div className='messageOverlayContainer'>
						{
							homePageData.firstPageWordsImgs.map((item, index) => {
								return (
									<div key={index} className={"imgContainer " + item.classname}>
										<img src={item.src} />
									</div>
								)
							})
						}
					</div>
				</div>


				<div className='page page_secondPage'>
					<div className='flex--row'>
						<div className='homePage_aboutMe flex--row'>
							<div className='card'>
								<p className='title'>{t('secondPage.aboutMeCardTitle')}</p>
								<div className='cardContent'>
									{t('secondPage.aboutMeCardParagraph')}
								</div>
								<Button sx={{ color: 'black', backgroundColor: 'gold' }} href='/aboutMe'>
									{t('secondPage.moreAboutMeButtonText') ? t('secondPage.moreAboutMeButtonText') : ''}
									<ArrowRight />
								</Button>
							</div>
						</div>
						<div className='imgContainer portraitImg sideImgContainer'>
							<img src={homePageData.secondPage.imgSrc} />
						</div>
					</div>
				</div>


				<div className='page page_thirdPage'>
					<div className='card flex--row'>
						<div className='cardContentContainer'>
							<div className='expertise'>
								<p className='title'>{t('thirdPage.expertiseCardTitle')}</p>
								<div className='cardContent'>
									{t('thirdPage.expertiseCardParagraph')}
								</div>
							</div>
							<div className='expertise_icons'>
								{
									homePageData.thirdPage.expertisesIcons.map((item, index) => {
										return (
											<div key={index} className='imgContainer glassBg sideImgContainer'>
												<img src={item.src} />
											</div>
										)
									})
								}
							</div>
						</div>
						<Button sx={{ color: 'black', backgroundColor: 'gold' }} href='/areaOfExpertise'>
							{t('thirdPage.moreExpertiseButtonText') ? t('thirdPage.moreExpertiseButtonText') : ''}
							<ArrowRight />
						</Button>
					</div>
				</div>

				<div className='page page_fourthPage'>
					<div className='flex--row itemsContainer'>
						<div className='imgContainer sideImgContainer'>
							<img src={homePageData.fourthPage.sideImgSrc} />
						</div>
						<div className='homePage_publications flex--row'>
							<div className='card'>
								<p className='title'>{t('fourthPage.publicationsCardTitle')}</p>
								{/* <div className='cardContent'>
									{t('fourthPage.publicationsCardParagraph')}
								</div> */}
								<Button sx={{ color: 'black', backgroundColor: 'gold' }} href='/publications'>
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
							<p className='title'>{t('fifthPage.honoraryTitle')}</p>
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
