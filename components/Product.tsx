import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface Props {
  product: {
    name: string;
    url_key: string;
    price_range: {
      minimum_price: {
        regular_price: {
          value: string;
        };
      };
    };
    image: {
      url: string;
    };
  };
}

const Product: FC<Props> = ({
  product: {
    name,
    url_key,
    price_range: {
      minimum_price: {
        regular_price: { value },
      },
    },
    image: { url },
  },
}) => {
  return (
    <Card
      sx={{
        p: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
          overflow: "hidden",
        }}
        variant="h5"
        className="text-center"
      >
        {name}
      </Typography>
      <CardMedia image={url} title={url_key} sx={{width: 320, height: 320}} /> 
      <CardContent className="flex flex-col md:flex-row gap-3">
        <div className="text-center md:text-left">
          <Typography variant="h6">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${value}
          </Typography>
        </div>
        <Button
          className="md:w-auto w-full"
          variant="contained"
          size="medium"
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
          color="warning"
        >
          <Link href={`/products/${url_key}`}>Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Product;
