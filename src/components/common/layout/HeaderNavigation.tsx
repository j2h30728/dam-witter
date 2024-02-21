import BackButton from './BackButton';
import DesktopMainLogo from './DesktopMainLogo';

/** mobile 너비에서는 뒤로가기버튼(Back Button), desktop 너비에서는 메인로고(Main Logo) */
const HeaderNavigation = ({ handleBack, hasBackButton }: { handleBack: () => void; hasBackButton: boolean }) => (
  <>
    <div className="md:hidden w-[50px]">{hasBackButton ? <BackButton onClick={handleBack} /> : null}</div>
    <DesktopMainLogo />
  </>
);

export default HeaderNavigation;
