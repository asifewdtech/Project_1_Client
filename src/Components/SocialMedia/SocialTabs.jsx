import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Youtube from "../SocialMediaPanels/YouTube/YouTube";
import Instagram from "../SocialMediaPanels/Instagram/Instagram";
import TikTok from "../SocialMediaPanels/TikTok/TikTok";

const SocialTabs = () => {
  const tabsData = [
    {
      key: "youtube",
      title: "YouTube",
      content: <Youtube />,
    },
    {
      key: "instagram",
      title: "Instagram",
      content: <Instagram />,
    },
    {
      key: "tiktok",
      title: "TikTok",
      content: <TikTok />,
    },
  ];

  return (
    <>
      <div className="row">
        <h3>Social Accounts</h3>
        <div className="col">
          <Tabs className="mb-3 " >
            {tabsData.map((tab, index) => (
                <Tab key={index} eventKey={tab.key} title={tab.title}>
                {tab.content}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default SocialTabs;
