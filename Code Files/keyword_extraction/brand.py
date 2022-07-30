import json
import lzma
import sys

def extract(path):
    with lzma.open(path) as fid:
        xyz=fid.readline()#byte class
        newxyz=xyz.decode()#str class
        index = newxyz.find('display_url')
        original_stdout = sys.stdout  
        with open('demo.json', 'w') as f:
            sys.stdout = f 
            for line in newxyz:
                print(line,end="")
        sys.stdout = original_stdout  
        with open('demo.json') as f:
            for i in range(index+14,index+14+1000):
                if(newxyz[i]!='"'):
                    print(newxyz[i],end="")
                else:
                    break
            print()
            df = json.load(f)
            print("Likes on Post: ",end="")
            print(df["node"]["edge_liked_by"]["count"])
            print("\n")

def url_caller(text):
    for i in text:
        url = f'https://www.flipkart.com/search?q={i}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'
        print(url)
       

def common(fashion_list):
    return_list=list()
    for item in fashion_list:
        string = ''
        for i in item:
            if i in ['0','1','2','3','4','5','6','7','8','9',':']:
                continue
            elif i == ' ':
                string += '+'
            else:
                string += i
        return_list.append(string)
    url_caller(return_list)

def print_the_links(trends,path_loc):
     if(len(trends)):
        print("<------Flipkart Search Results------>")
        common(trends)
        print("\n<------Product Image------>")
        json_file_path=path_loc.replace("txt","json.xz")
        extract(json_file_path)


def brand_a(loc):
    with open(loc,'r') as txt_file:
        txt = txt_file.readlines()
        txt = txt[1:]
        lis = []
        for text in txt:
            if text == '\n':
                continue
            else:
                lis.append(text)
        fashion  = list()
        for item in lis:
            fashion.append(item[:-2])
    print_the_links(fashion,loc)

    # If similar products are available on instagram then we proceed to provide the image else we stop here


def brand_b(loc):
    with open(loc,'r') as xyz:
        txt=xyz.readlines()
        fashion = list()
        for s in txt:
            if s!='\n' and ': ' in s:
                fashion.append((s.split(': ')[0]))
    print_the_links(fashion,loc)


def brand_c(loc):
    with open(loc,'r') as xyz:
        text3=xyz.readlines()
        setbegin=0
        fashion = list()
        for s in text3:
            if(s!='\n' and ('–––––') in s):
                if(not setbegin):
                    setbegin=1
                else:
                    setbegin=0
            
            elif(s!='\n' and setbegin and ': ' in s):
                fashion.append(s.split(': ')[0])
    print_the_links(fashion,loc)


def brand_d(loc):
    with open('stylishgridgame/stylishgridgame_2/2020-09-01_09-10-32_UTC.txt','r') as xyz:
        text2=xyz.readlines()
        startat=0
        fashion=list()
        for s in text2:
            if(s!='\n' and ('Brands') in s):
                startat=1
            if (startat and s!='\n' and ' = ' in s):
                fashion.append(s.split(' = ')[0])
    print_the_links(fashion,loc)


