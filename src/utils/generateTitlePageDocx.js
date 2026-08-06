import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  PageBreak,
} from "docx";
import { ACKNOWLEDGEMENTS } from "../text/acknowledgements";

const FONT = "Arial";
const BASE_SIZE = 22; // 11pt (docx sizes are in half-points)

export async function generateTitlePageDocx({ title, authors }) {
  // 1. Assign each unique organization a number, in order of first appearance
  const affiliationNumbers = new Map();
  authors.forEach(({ organization }) => {
    const org = (organization || "").trim();
    if (org && !affiliationNumbers.has(org)) {
      affiliationNumbers.set(org, affiliationNumbers.size + 1);
    }
  });

  // 2. Build the inline author line: Name¹, Name², Name¹, and Name³
  const authorRuns = [];
  authors.forEach((author, index) => {
    const org = (author.organization || "").trim();
    const number = org ? affiliationNumbers.get(org) : null;

    authorRuns.push(
      new TextRun({
        text: author.name,
        font: FONT,
        size: BASE_SIZE,
      }),
    );

    if (number) {
      authorRuns.push(
        new TextRun({
          text: String(number),
          superScript: true,
          font: FONT,
          size: BASE_SIZE,
        }),
      );
    }

    const isLast = index === authors.length - 1;
    const isSecondToLast = index === authors.length - 2;
    if (!isLast) {
      authorRuns.push(
        new TextRun({
          text: isSecondToLast && authors.length > 1 ? ", and " : ", ",
          font: FONT,
          size: BASE_SIZE,
        }),
      );
    }
  });

  // 3. Build the numbered affiliation list below the authors
  const affiliationParagraphs = Array.from(affiliationNumbers.entries()).map(
    ([org, number]) =>
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: String(number),
            superScript: true,
            font: FONT,
            size: BASE_SIZE,
          }),
          new TextRun({
            text: ` ${org}`,
            font: FONT,
            size: BASE_SIZE,
          }),
        ],
      }),
  );

  // 4. Static acknowledgements, split into paragraphs on blank lines
  const acknowledgementParagraphs = ACKNOWLEDGEMENTS.split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (paragraph) =>
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: paragraph,
              font: FONT,
              size: BASE_SIZE,
            }),
          ],
        }),
    );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 }, // US Letter
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 1500, after: 480 },
            children: [
              new TextRun({
                text: title,
                bold: true,
                font: FONT,
                size: BASE_SIZE,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 360 },
            children: [
              new TextRun({
                text: "Authors: ",
                bold: true,
                font: FONT,
                size: BASE_SIZE,
              }),
              ...authorRuns,
            ],
          }),
          new Paragraph({
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: "Affiliations",
                bold: true,
                font: FONT,
                size: BASE_SIZE,
              }),
            ],
          }),
          ...affiliationParagraphs,
          new Paragraph({
            children: [new PageBreak()],
          }),
          new Paragraph({
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: "Acknowledgements",
                bold: true,
                font: FONT,
                size: BASE_SIZE,
              }),
            ],
          }),
          ...acknowledgementParagraphs,
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
