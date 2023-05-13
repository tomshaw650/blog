import { SiLinkedin, SiGithub, SiTwitter, SiDiscord } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="mt-12">
      <ul className="flex gap-x-5 bottom-0">
        <li>
          <a href="https://www.linkedin.com/in/tom-shaw99/">
            <SiLinkedin size={32} className="hover:text-[#FDD641]" />
          </a>
        </li>
        <li>
          <a href="https://www.github.com/tomshaw650">
            <SiGithub size={32} className="hover:text-[#FDD641]" />
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com/tomshawdev">
            <SiTwitter size={32} className="hover:text-[#FDD641]" />
          </a>
        </li>
        <li>
          <a href="https://discordapp.com/users/153567788303122432">
            <SiDiscord size={32} className="hover:text-[#FDD641]" />
          </a>
        </li>
      </ul>
    </footer>
  );
};
