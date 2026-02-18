import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

//  2026-01-03T13:37:51+05:30 - Date format

const randomTime = () => {
  const h = Math.floor(Math.random() * (18 - 8) + 8);
  const m = Math.floor(Math.random() * 60);
  const s = Math.floor(Math.random() * 60);

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

console.log(randomTime());

const generateFn = async (number) => {
  const path = "./data.json";
  const git = simpleGit();
  for (let i = 0; i < number; i++) {
    const date = moment(`2019-10-16T${randomTime()}+05:30`).format();

    const data = {
      date: date,
    };

    await jsonfile.writeFile(path, data);
    process.env.GIT_AUTHOR_DATE = date;
    process.env.GIT_COMMITTER_DATE = date;
    await git.add([path]);
    await git.commit(date, { "--date": date });
    console.log(`commit ${i + 1} Done`);
  }
  await git.push();
};

generateFn(1);
