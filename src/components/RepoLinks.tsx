import githubLogo from "../assets/github.svg";

const LOGO_SIZE = 40;

export const RepoLinks = () => {
  return (
    <>
      <h5>
        <img
          alt="Github logo"
          height={LOGO_SIZE}
          src={githubLogo}
          width={LOGO_SIZE}
        />
        &nbsp;Repositories
      </h5>
      <ul>
        <li>
          Frontend:&nbsp;
          <a href="https://github.com/gkatanacio/paraphraser-ui">
            paraphraser-ui
          </a>
        </li>
        <li>
          Backend:&nbsp;
          <a href="https://github.com/gkatanacio/paraphraser-api">
            paraphraser-api
          </a>
        </li>
      </ul>
    </>
  );
};
