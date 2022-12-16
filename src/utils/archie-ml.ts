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

export type NavMenuItem = {
  key: string;
  to: string;
  value: string;
};

export interface Section {
  key: "section";
  id?: string;
  image?: string;
  sectionTitle: string;
  title: string;
  internalMenu?: { id: string; title: string }[];
  blocks: Block[];
  background?: string;
}

interface BlockBase {
  id?: string;
  value: string;
  background?: string;
}

export interface GraphBlock extends BlockBase {
  key: "graph-by-id";
}

export interface ScrollyBlock extends BlockBase {
  key: "scrolly-by-id";
  steps?: ScrollyStep[];
}

export interface ScrollyStep {
  key: "scrolly-card";
  content: string;
  id?: string;
}

interface TextBlock extends BlockBase {
  key: "text";
  value: string;
}

export type Block = TextBlock | ScrollyBlock | GraphBlock;

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
