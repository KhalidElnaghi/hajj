import { Typography } from "@mui/material";

import { useTranslate } from "src/locales";

interface IProps{
_key: string;
value: string|number;

}

function KeyValueTypography({_key,value}:IProps) {
    const {t} = useTranslate();
  return (
    <Typography
              variant="body1"
              sx={{ display: 'flex', color: 'text.disabled' }}
              color="text-secondary"
            >
              {`${t(_key)} : `}
              <Typography variant="subtitle1" color="text.secondary">
                {value}
              </Typography>
            </Typography>
  )
}

export default KeyValueTypography