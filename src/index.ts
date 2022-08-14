import { timeParse } from 'd3';
import { scores } from './history';
import dayjs from 'dayjs';
const d3nLine = require('d3node-linechart');

export default async (req: any, res: any) => {
  res.setHeader("Content-Type", "image/svg+xml");

  const {
    username
  } = req.query;
  const myScores: any = await scores(username);
  const data = myScores.filter((score: any) => score.IsRated == true)
    .map((score: any) => {
      const parseTime = timeParse("%Y-%m-%d");
      return {
        key: parseTime(dayjs(score.EndTime).format('YYYY-MM-DD')),
        value: score.NewRating,
      }
    }
    )

  const line = d3nLine({ data: data, username: username });

  return res.send(line.svgString());
}
