import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <Link
      to="#"
      onClick={(e) => {
        e.preventDefault(); 
        navigate(-1);
      }}
      className="ml-5 flex w-fit items-center justify-center rounded-full bg-white p-2 lg:ml-10"
    >
      <MdArrowBackIos size={20} />
    </Link>
  );
};

export default GoBackButton;
