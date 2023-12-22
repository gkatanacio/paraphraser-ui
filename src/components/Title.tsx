import icon from "../assets/gene.png";

const ICON_SIZE = 47;

export const Title = () => {
  return (
    <h1 className="d-flex justify-content-center border-bottom mt-1">
      <img src={icon} alt="icon" height={ICON_SIZE} width={ICON_SIZE} />
      &nbsp;Paraphraser
    </h1>
  );
};
