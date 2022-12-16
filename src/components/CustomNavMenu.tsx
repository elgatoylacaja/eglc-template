interface Props {}

const CustomNavMenu = (props: Props) => {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        height: "64px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "black",
        }}
      ></div>
      {/* { Completar } */}
      <div>Share</div>
    </nav>
  );
};

export default CustomNavMenu;
