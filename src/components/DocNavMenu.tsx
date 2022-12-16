import { NavMenuItem } from "../utils/archie-ml";

interface Props {
  navMenu: NavMenuItem[];
}

const DocNavMenu = (props: Props) => {
  const { navMenu } = props;
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
        zIndex: 999,
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
      <div style={{ display: "flex", gap: "12px" }}>
        {navMenu.map((item) => {
          return (
            <a
              key={item.key}
              href={item.to}
              target={item.to.startsWith("#") ? "_self" : "_blank"}
              rel="noreferrer noopener"
            >
              {item.value}
            </a>
          );
        })}
      </div>
      <div>Share</div>
    </nav>
  );
};

export default DocNavMenu;
