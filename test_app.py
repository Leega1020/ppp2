from app import check_deleteLike

def test_check_deleteLike():
    assert check_deleteLike("","")==False
    assert check_deleteLike("aa","")==False
    assert check_deleteLike("","aa")==False
    assert check_deleteLike("aa","aa")==True
    assert check_deleteLike("aaa","aaaaa")==True

  
