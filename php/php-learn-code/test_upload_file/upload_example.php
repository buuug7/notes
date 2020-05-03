<?php
/**
 * Created by PhpStorm.
 * User: buuug7
 * Date: 2015/6/29
 * Time: 21:45
 */

require "FileUpload.php";

//echo __FILE__;
//die();
$fileUpload=new \buuug7\FileUpload();
//设置上传文件的大小,单位为kb
$fileUpload->fileSize=5*1024*1024;
//设置上传文件允许的类型
$fileUpload->extArr=array("gif","jpg","jpeg","png","bmp","txt","zip","rar");
//设置上传文件目录
$fileUpload->uploadPath=dirname(__FILE__)."/upload";
//定义上传文件的新名称
$fileUpload->newName=time().'';
//上传
if($fileUpload->upload()){
    echo "<script>alert('upload file success!');location='upload_example.php';</script>";
}
?>

<
!DOCTYPE html >
    <html>
<head lang="zh">
    <meta charset="utf-8">
    <title>upload</title>
</head>
<body>
    <form method="post" action="upload_example.php" enctype="multipart/form-data">
        <label for="name">file</label>
        <input type="file" name="file">
        <input type="submit" value="submit">
    </form>
    <hr>
    <p class="box">
        <?php foreach (scandir('upload') as $v):?>
            <?php if(!in_array($v,['.','..'])):?>
                <img src="<?='upload/'.$v?>" style="width:150px;height:auto;"> 
                <button class='close-btn' data-name="<?=$v?>">&times;</button>
            <?php endif;?>
        <?php endforeach;?>
    </p>
</body>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript">
    $(function() {
        $('.box').on('click', function(e) {
            var target = e.target;
            if (target.nodeType == 1 && target.getAttribute('class') == 'close-btn') {
                var fileName = target.getAttribute('data-name');
                if (confirm("do your confirm delete this image?")) {
                    $.ajax({
                        url: 'delete.php',
                        method: 'post',
                        data: {
                            'filename': fileName
                        },
                        success: function(data) {
                            console.log(data);
                            var obj = $.parseJSON(data);
                            console.log(obj);
                            if (obj.status == 1) {
                                window.location.reload();
                            }
                        }
                    });
                }
            }
        });
    });

</script>
</html>