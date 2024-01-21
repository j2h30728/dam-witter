import useProfileContext from './useProfileContext';

const DefaultUserFooter = () => {
  const { profile } = useProfileContext();

  return <p className="h-40 mx-5 mt-10 text-lg">{profile?.profile?.bio}</p>;
};

export default DefaultUserFooter;
