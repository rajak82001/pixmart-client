
const ImageCard = ({ id, img, title, price, author, icon1, icon2 }) => {
  return (
    <div className="rounded-xl bg-white shadow-xl hover:shadow-2xl p-4 h-fit transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
      <div className="w-full h-[50%] sm:h-[200px] overflow-hidden rounded-lg relative">
        <img
          src={img}
          alt={title}
          className="w-full h-full hover:scale-105 transition-all ease-linear duration-300 transform cursor-pointer"
        />
        {/* {console.log("Author in ImageCARD :", author)} */}
      </div>


      <p className="font-semibold text-white bg-black w-fit px-5 rounded-full text-xs sm:text-sm mt-3">
        {/* {"@"+ author.charAt(0).toUpperCase() + author.slice(1)} */}
        { author.charAt(0).toUpperCase() + author.slice(1)}
      </p>

      <div className="flex justify-between items-center mt-2">
        <div>
          <h3 className="text-sm sm:text-lg font-semibold">{title}</h3>
          <p className="text-sm text-grey-500">Price : ${price}</p>
        </div>
        <div className="flex gap-3 justify-center items-center text-gray-600 hover:text-gray-900 transition-colors duration-300">
            {icon1}
            {icon2}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
