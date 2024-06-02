import "./Chip.css";

/*
This component props allows
 - ClassName:
  * bg-secondary-alt: to show inactive status
  * bg-green-alt: to show active status active
  * bg-[any other]: to show information about "conteos"
 - ClassNameStatus, only if it is to show status circle: 
   * bg-green: to show active status
   * bg-secondary: to show inactive status
*/

export const Chip = ({ className = "", classNameStatus = "", children }) => {
  return (
    <div className={`chip-component ${className}`}>
      {classNameStatus !== "" ? (
        <div className={`chip-status ${classNameStatus}`}></div>
      ) : (
        <></>
      )}{" "}
      {children}
    </div>
  );
};
