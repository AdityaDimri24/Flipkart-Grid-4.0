import instaloader
from keyword_extraction import brand
bot = instaloader.Instaloader()

# -------------------Fetching the post and it's related data------------------------
# ----Uncomment this code to fetch new data, for now we have some prefetched data---

# CURRENT_DIR = os.getcwd()
# brands = ['faballey','forever21_in','hm','mycreativelook','stylishgridgame']
# for Username in brands:
#     path = CURRENT_DIR + '/' + Username
#     if not os.path.exists(path):
#         os.makedirs(path)
#     os.chdir(path)
#     profile = instaloader.Profile.from_username(bot.context, Username)
#   # print("Username: ", profile.username)
#   # print("User ID: ", profile.userid)
#   # print("Number of Posts: ", profile.mediacount)
#   # print("Followers: ", profile.followers)
#   # print("Followees: ", profile.followees)
#   # print("Bio: ", profile.biography,profile.external_url)
#     posts = profile.get_posts()
#     try:
#         for index, post in enumerate(posts, 1):
#             bot.download_post(post, target=f"{profile.username}_{index}")
#             if index>=2:
#                 break
#     except:
#         exit()
#
# -------------------Finished Fetching-------------------

# ------------------Hardcoding different brand products name using their decription-------------------
print()
brand.brand_a('hm/hm_2/2022-07-28_11-44-19_UTC.txt')

brand.brand_b('forever21_in/forever21_in_2/2022-07-28_13-09-03_UTC.txt')

brand.brand_c('mycreativelook/mycreativelook_2/2022-05-31_02-26-33_UTC.txt')

