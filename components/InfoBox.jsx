import Link from 'next/link';

const InfoBox = ({
  heading,
  backgroundColor = 'bg-gray-100',  // Default - for the case nothing will be set
  textColor = 'text-gray-800',
  buttonInfo, // Is an object passed in
  children,
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <Link
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};
export default InfoBox;
