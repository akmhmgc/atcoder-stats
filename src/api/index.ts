import { timeParse } from 'd3';
import { scores } from '../fetchers/history';
import dayjs from 'dayjs';
const d3nLine = require('d3node-linechart');

export default async (req: any, res: any) => {
  res.setHeader("Content-Type", "image/svg+xml");

  const {
    username
  } = req.query;
  const myScores: any = await scores(username);
  const data = myScores.map((score: any) => {
    const parseTime = timeParse("%Y-%m-%d");
    return {
      key: parseTime(dayjs(score.EndTime).format('YYYY-MM-DD')),
      value: score.NewRating,
    }
  }
  )

  const line = d3nLine({ data: data, isCurve: false, margin: { top: 20, right: 20, bottom: 60, left: 50 }, });

  return res.send(line.svgString());
}
