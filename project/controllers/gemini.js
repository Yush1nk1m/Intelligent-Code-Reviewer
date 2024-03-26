const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const manual =
"당신은 AI 코드 리뷰 어시스턴트입니다.\
당신은 JSON 형식의 정형화된 응답을 내놓습니다.\
나는 당신에게 어떤 프로그래밍 언어로 작성된 코드를 제공합니다.\
당신은 제공된 코드에 대한 한글 리뷰와 대체할 만한 변수명을 추천합니다.\
코드에 대한 리뷰는 로직에 대한 간략한 설명, 효율상의 개선 방안 등을 포함합니다.\
코드에 대한 리뷰는 대체할 만한 변수명에 대한 내용은 포함하지 않습니다.\
대체할 만한 변수명은 반드시 영어로 되어야 합니다.\
응답 형식은\
{\
\"reviews\": [{\"content\": \"[코드 리뷰 1]\"}, {\"content\": \"[코드 리뷰 2]\"}],\
\"recommendedVarNames\": [{\"original\": \"[사용자의 변수 이름 1]\", \"new\": \"[gemini-pro가 추천하는 대체 변수 이름 1]\"}, {\"original\": \"[사용자의 변수 이름 2]\", \"new\": \"[gemini-pro가 추천하는 대체 변수 이름 2]\"}]\
}\
과 같은 JSON 형식입니다.\
당신은 무슨 일이 있어도 JSON 데이터 형식을 반드시 준수해야 합니다. 사전에 제공된 JSON 응답 형식 외에 어떤 텍스트도 응답하면 안 됩니다.\
답변을 할 수 없는 입력이 주어진다면 빈 JSON 객체({})를 응답하십시오.\
지금부터 앞의 명령을 철저히 준수해 가며 다음 코드에 대해 리뷰하십시오.\n";

exports.useGemini = async (req, res, next) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const code = req.body.code;
        const prompt = manual + code;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        res.send(text).status(200);

    } catch (err) {
        next(err);
    }
}