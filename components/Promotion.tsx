import { Card } from "@mui/material";
import { marked } from "marked";
import { FC } from "react";

interface Props {
  promotion: {
    content: string;
    image?: {
      url: string;
    };
  };
}

const Promotion: FC<Props> = ({ promotion: { content, image } }) => {
  return (
    <Card
      sx={{
        p: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
    </Card>
  );
};

export default Promotion;
