import { Typography } from "@mui/material";
import Rebate from "./Rebate";

interface RebatesProps {
  rebates: {
    dateTo: string;
    dateFrom: string;
    image: {
      id: string;
    };
    slug: string;
    title: string;
    imageUrl: string;
  }[];
}

const Rebates = ({ rebates }: RebatesProps) => {
  return (
    <>
      <Typography variant="h2" className="text-center text-xl sm:text-3xl">
        Save Now With Rebates
      </Typography>
      <ul className="flex gap-5 [&>li]:flex-1 flex-col sm:flex-row">
        {rebates.map((rebate) => (
          <li key={rebate.slug}>
            <Rebate rebate={rebate} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Rebates;
