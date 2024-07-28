const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(`${process.env.GEMAPI}`);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
let numberOfTweet = 5;


let i =0;
const authToken = `${process.env.AUTH_TOKEN}`;  // Replace with your actual auth token
const csrfToken = `${process.env.CSRF_TOKEN}`; 

async function tweet(){

    var prompt = "funny developer quote in one line and do not repeat previous one make new one be humourous don't start with i am not lazy "
    var result = await model.generateContent(prompt);
    var response = await result.response;
    var text = response.text();
  
const payload = {
  variables: {
    tweet_text: `${text}`,
    dark_request: false,
    media: {
      media_entities: [],
      possibly_sensitive: false,
    },
    semantic_annotation_ids: [],
    disallowed_reply_options: null,
  },
  features: {
    communities_web_enable_tweet_community_results_fetch: true,
    c9s_tweet_anatomy_moderator_badge_enabled: true,
    tweetypie_unmention_optimization_enabled: true,
    responsive_web_edit_tweet_api_enabled: true,
    graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
    view_counts_everywhere_api_enabled: true,
    longform_notetweets_consumption_enabled: true,
    responsive_web_twitter_article_tweet_consumption_enabled: true,
    tweet_awards_web_tipping_enabled: false,
    creator_subscriptions_quote_tweet_preview_enabled: false,
    longform_notetweets_rich_text_read_enabled: true,
    longform_notetweets_inline_media_enabled: true,
    articles_preview_enabled: true,
    rweb_video_timestamps_enabled: true,
    rweb_tipjar_consumption_enabled: true,
    responsive_web_graphql_exclude_directive_enabled: true,
    verified_phone_label_enabled: true,
    freedom_of_speech_not_reach_fetch_enabled: true,
    standardized_nudges_misinfo: true,
    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
    responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
    responsive_web_graphql_timeline_navigation_enabled: true,
    responsive_web_enhance_cards_enabled: false,
  },
  queryId: "FcQ8KP1fbPXkq2AugbyXGw",
};


axios.post('https://x.com/i/api/graphql/FcQ8KP1fbPXkq2AugbyXGw/CreateTweet', payload, {
  headers: {
    'accept': '*/*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'authorization': `Bearer ${authToken}`,
    'content-type': 'application/json',
    'cookie': 'lang=en; guest_id=v1%3A169366972912153821; twid=u%3D1694386161903390720; auth_token=92dc110f28aadfaac112f8c68d5df497ebcd71b6; guest_id_ads=v1%3A169366972912153821; guest_id_marketing=v1%3A169366972912153821; ct0=727db2b2bb11fc41136ca31e257f6441e2ef12f5846af8345eaa2bdc1c0a06ef79bc42d660e7ad8316d47efbaf78c5a5cc8a5ded6a1ccf2e7aec40ba892655bea917668e58151ce48f8d60a8121da1df; _ga=GA1.2.405622037.1715967294; lang=en; personalization_id="v1_q5EvxIv+QIsOvAww3gEATw=="',
    'origin': 'https://x.com',
    'priority': 'u=1, i',
    'referer': 'https://x.com/home',
    'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    'x-client-transaction-id': '3KbzROarC6EDpKltUSQybjAfXOOcYretYVOKki6HnxvsQ02vV34LM3XMHsiFEOaZJzQ5it58GqK/Idk266oIThuhjAOV3w',
    'x-csrf-token': csrfToken,
    'x-twitter-active-user': 'yes',
    'x-twitter-auth-type': 'OAuth2Session',
    'x-twitter-client-language': 'en',
  }
})

.then(response => {
  console.log('Tweet posted:', response.data);
})
.catch(error => {
  console.error('Error posting tweet');
});
}
for (let index = 0; index < numberOfTweet; index++) {
    tweet();
}
