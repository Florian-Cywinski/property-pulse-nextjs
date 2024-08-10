const PropertyPage = ({ params }) => {  // params to get the id (or whatever is required)

  return (
    <>
      <div>
        Single Property page { params.id }  {/* To show 'Single Property page 9' on http://127.0.0.1:3000/properties/9?name=brad */}
      </div>
    </>
  )
};
export default PropertyPage;
