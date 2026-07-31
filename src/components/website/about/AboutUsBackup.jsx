import Story from "@/components/website/about/Story";
import ShortBanner from "@/components/shared/ShortBanner";
import storyImg from "@/assests/story.svg";

const page = () => {
  return (
    <div>
      <ShortBanner text={"About LinkFast"} />
      <div className="space-y-[60px] my-10">
        <Story
          img={storyImg}
          heading="Our Story"
          text1="scelerisque convallis. Sed faucibus dui. sit tincidunt eu placerat.
          eget Ut nisi cursus venenatis tortor. leo. faucibus dui diam est. Ut
          at sed tincidunt eget consectetur non, tincidunt In efficitur. laoreet
          non felis, faucibus Praesent id id diam elementum Donec ex venenatis
          id porta ex tincidunt dui. sodales. Sed tempor eget Vestibulum Quisque
          luctus dui lacus sed gravida facilisis adipiscing id sed Ut vitae odio
          gravida In venenatis felis, tempor faucibus amet, Nunc sapien vitae ex
          convallis. tortor. dolor nisi massa amet, urna tincidunt ac eget sed
          nulla, eu nec malesuada venenatis convallis. quam nisl. Donec In sed
          quis urna. ullamcorper elementum gravida enim. sit nisl. sollicitudin.
          hendrerit fringilla lacus dui. consectetur venenatis placerat.
          placerat lacus, at viverra"
          text2="tincidunt dui fringilla tortor. ipsum tempor Praesent laoreet luctus
          tempor id quam ipsum ullamcorper ultrices Nunc convallis. scelerisque
          sollicitudin. venenatis Lorem orci massa massa Morbi sit hendrerit
          volutpat placerat nec at non hendrerit Morbi ex nec amet, Nunc
          fringilla Nunc Donec at tempor luctus ex Nunc varius Quisque sit in
          facilisis at libero, quis adipiscing maximus felis, amet, turpis quis
          at urna diam Praesent Cras libero, lacus tempor elementum Lorem vitae
          elementum tincidunt lorem. nec Vestibulum lacus Ut tincidunt orci est.
          nec lacus, risus enim. laoreet cursus ipsum nec ultrices Donec urna.
          diam ullamcorper vel consectetur libero, Nunc In cursus odio faucibus"
        />

        <Story
          img={storyImg}
          className="lg:flex-row-reverse"
          heading="Leading the Future"
          text1="scelerisque convallis. Sed faucibus dui. sit tincidunt eu placerat.
          eget Ut nisi cursus venenatis tortor. leo. faucibus dui diam est. Ut
          at sed tincidunt eget consectetur non, tincidunt In efficitur. laoreet
          non felis, faucibus Praesent id id diam elementum Donec ex venenatis
          id porta ex tincidunt dui. sodales. Sed tempor eget Vestibulum Quisque
          luctus dui lacus sed gravida facilisis adipiscing id sed Ut vitae odio
          gravida In venenatis felis, tempor faucibus amet, Nunc sapien vitae ex
          convallis. tortor. dolor nisi massa amet, urna tincidunt ac eget sed
          nulla, eu nec malesuada venenatis convallis. quam nisl. Donec In sed
          quis urna. ullamcorper elementum gravida enim. sit nisl. sollicitudin.
          hendrerit fringilla lacus dui. consectetur venenatis placerat.
          placerat lacus, at viverra"
          text2="tincidunt dui fringilla tortor. ipsum tempor Praesent laoreet luctus
          tempor id quam ipsum ullamcorper ultrices Nunc convallis. scelerisque
          sollicitudin. venenatis Lorem orci massa massa Morbi sit hendrerit
          volutpat placerat nec at non hendrerit Morbi ex nec amet, Nunc
          fringilla Nunc Donec at tempor luctus ex Nunc varius Quisque sit in
          facilisis at libero, quis adipiscing maximus felis, amet, turpis quis
          at urna diam Praesent Cras libero, lacus tempor elementum Lorem vitae
          elementum tincidunt lorem. nec Vestibulum lacus Ut tincidunt orci est.
          nec lacus, risus enim. laoreet cursus ipsum nec ultrices Donec urna.
          diam ullamcorper vel consectetur libero, Nunc In cursus odio faucibus"
        />

        <Story
          img={storyImg}
          heading="Founders"
          text1="scelerisque convallis. Sed faucibus dui. sit tincidunt eu placerat.
          eget Ut nisi cursus venenatis tortor. leo. faucibus dui diam est. Ut
          at sed tincidunt eget consectetur non, tincidunt In efficitur. laoreet
          non felis, faucibus Praesent id id diam elementum Donec ex venenatis
          id porta ex tincidunt dui. sodales. Sed tempor eget Vestibulum Quisque
          luctus dui lacus sed gravida facilisis adipiscing id sed Ut vitae odio
          gravida In venenatis felis, tempor faucibus amet, Nunc sapien vitae ex
          convallis. tortor. dolor nisi massa amet, urna tincidunt ac eget sed
          nulla, eu nec malesuada venenatis convallis. quam nisl. Donec In sed
          quis urna. ullamcorper elementum gravida enim. sit nisl. sollicitudin.
          hendrerit fringilla lacus dui. consectetur venenatis placerat.
          placerat lacus, at viverra"
          text2="tincidunt dui fringilla tortor. ipsum tempor Praesent laoreet luctus
          tempor id quam ipsum ullamcorper ultrices Nunc convallis. scelerisque
          sollicitudin. venenatis Lorem orci massa massa Morbi sit hendrerit
          volutpat placerat nec at non hendrerit Morbi ex nec amet, Nunc
          fringilla Nunc Donec at tempor luctus ex Nunc varius Quisque sit in
          facilisis at libero, quis adipiscing maximus felis, amet, turpis quis
          at urna diam Praesent Cras libero, lacus tempor elementum Lorem vitae
          elementum tincidunt lorem. nec Vestibulum lacus Ut tincidunt orci est.
          nec lacus, risus enim. laoreet cursus ipsum nec ultrices Donec urna.
          diam ullamcorper vel consectetur libero, Nunc In cursus odio faucibus"
        />
      </div>
    </div>
  );
};

export default page;
