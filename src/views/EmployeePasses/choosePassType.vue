<template>
    <div class='choosePassType'>
        <div class='title'>
            <span>请选择通行类型</span>
        </div>
        <div class='types'>
           <div class='type' @click='goToCliockin(1)'>
               <span >出示通行证</span>
           </div>
           <div class='type' @click='goToCliockin(2)'>
               <span>来访登记</span>
           </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        goToCliockin(id){
            this.$router.push({
                name:'residentClockin',
                query:{
                    id,
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .choosePassType{
        height: 100%;
        .title{
            margin-top:5rem;
            font-weight: bold;
            font-size: 1rem;
            width:100%;
            height:100px;
            display: flex;
              justify-content: center;
              align-items: center;
        }
        .types{

        }
        .type{
              width:90%;
              height:40px;
              margin:1.5rem auto;
              border-radius: .5rem;
              background:rgb(39, 107, 235);
              box-shadow: 0px 3px 6px rgb(111, 159, 247);
              display: flex;
              justify-content: center;
              align-items: center;
              span{
                  color:#fff;
              }
        }
    }
</style>