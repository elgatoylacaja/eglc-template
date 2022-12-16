import { useState } from "react";

interface Props {
  menu: {
    id: string;
    title: string;
  }[];
}
const InternalMenu = ({ menu }: Props) => {
  const [itemSelected, setItemSelected] = useState<string | undefined>();
  return (
    <div
      style={{
        position: "absolute",
        height: "calc(100% - 64px * 2)",
        top: "64px",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "calc(64px * 2)",
        }}
      >
        <ul
          style={{
            listStyle: "none",
          }}
        >
          {menu.map((item) => (
            <li
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
              key={item.id}
            >
              <div
                style={{
                  height: "8px",
                  width: "8px",
                  borderRadius: "100%",
                  background:
                    item.id === itemSelected ? "#1d1d1d" : "transparent",
                  border: "1px solid #1d1d1d",
                }}
              ></div>
              <a
                style={{
                  textDecoration: "none",
                  color: "#1d1d1d",
                }}
                href={`#${item.id}`}
                onClick={() => setItemSelected(item.id)}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InternalMenu;
