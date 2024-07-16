import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import Link from "next/link";

interface RebateProps {
  rebate: {
    title: string;
    slug: string;
    image: { id: string };
    dateTo: string;
    dateFrom: string;
    imageUrl: string;
  };
}

const Rebate = ({ rebate }: RebateProps) => {
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={rebate.imageUrl} title="item 1" />
      <CardContent className="flex flex-col items-center space-y-3 bg-gray-200">
        <Typography
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
          }}
          variant="h5"
          lineHeight={1}
        >
          {rebate.title}
        </Typography>
        <Button
          endIcon={<NavigateNext />}
          variant="contained"
          className="bg-yellow-500 hover:bg-yellow-400"
        >
          <Link target="_blank" href={`/${rebate.slug}`}>
            View Offer
          </Link>
        </Button>
        <Typography variant="h4" fontSize="1rem" lineHeight={1}>
          {rebate.dateFrom} - {rebate.dateTo}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Rebate;
