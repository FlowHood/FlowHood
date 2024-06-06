
const TitleComponent = ({ title, data }) => {
    return (
      <div className=" flex flex-col items-start text-left text-[#495865]">
        <p className="text-[1.0625rem] font-semibold uppercase leading-[1.6875rem] ">
          {title}
        </p>
        <p className="text-[1.0625rem] font-normal uppercase leading-[1.6875rem]">
          {data}
        </p>
      </div>
    );
  };
  
  export default TitleComponent;