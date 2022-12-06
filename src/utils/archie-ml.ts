import archieml from "archieml";
// import * as Yup from "yup";

export async function getParsedDoc(id: string) {
  const data = await fetch(
    `https://docs.google.com/feeds/download/documents/export/Export?id=${id}&exportFormat=txt`
  ).then((res) => res.text());
  const parsed: ParsedDoc = archieml.load(data);

  return parsed;
}

export interface ParsedDoc {
  title: string;
  description: string;
  shareText?: string;
  ogimage: string;
  url: string;
  navMenu?: NavMenuItem[];
  sections: Section[];
}

type NavMenuItem = {
  key: string;
  to: string;
  value: string;
};

interface Section {
  key: "section";
  id?: string;
  image?: string;
  sectionTitle: string;
  title: string;
  internalMenu?: { id: string; title: string }[];
  blocks: Block[];
}

type GraphBlock = {
  key: "graph";
};

type ScrollyStep = {
  key: "scrolly-vstf";
  content: string;
  id?: string;
};

type ScrollyBlock = {
  key: "scrolly";
  steps: ScrollyStep[];
};

type TextBlock = {
  key: "text";
  value: string;
};

export type Block = {
  id?: string;
  value: string;
  background?: string;
} & (TextBlock | ScrollyBlock | GraphBlock);

// const schema = Yup.object({
//   title: Yup.string().required(),
//   description: Yup.string().required(),
//   shareText: Yup.string().optional(),
//   ogimage: Yup.string().required(),
//   url: Yup.string().required(),
//   navMenu: Yup.array()
//     .of(
//       Yup.object({
//         key: Yup.string().required(),
//         to: Yup.string().required(),
//         value: Yup.string().required(),
//       })
//     )
//     .optional(),
//   sections: Yup.array()
//     .of(
//       Yup.object({
//         key: Yup.string()
//           .matches(new RegExp("section"), "key must be section")
//           .required(),
//         id: Yup.string().optional(),
//         image: Yup.string().optional(),
//         title: Yup.string().required(),
//         sectionTitle: Yup.string().required(),
//         internalMenu: Yup.array().of(
//           Yup.object({
//             id: Yup.string().required(),
//             title: Yup.string().required(),
//           })
//         ),
//       })
//     )
//     .required(),
// });
